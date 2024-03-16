import prismaClient from "@/lib/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { FormProps } from "@/components/Employes/FormCreateEmploye";
import { CompanyRole } from "@prisma/client";
import clerk from "@clerk/clerk-sdk-node";
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as FormProps;

    const user = auth();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const getRole = await prismaClient.user.findUniqueOrThrow({
      where: {
        userID: user.userId!,
      },
      select: {
        role: true,
      },
    });
    if (getRole.role !== "admin") {
      return new Response("Unauthorized", { status: 401 });
    }
    let role: CompanyRole;
    switch (body.role) {
      case "Admin":
        role = CompanyRole.Admin;
        break;
      case "Employee":
        role = CompanyRole.Employee;
        break;
      case "Manager":
        role = CompanyRole.Manager;
        break;
      default:
        throw new Error("Role not found");
    }

    const createEmployee = await prismaClient.employee.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        role: role,
        phone: body.phone,
        address: body.address,
        salary: body.salary,
        onBoarding: body.onBoarding,
        IBAN: body.bankAccountIBAN,
        taxid: body.taxId,
        insurance: body.insurance,
        position: body.position,
        userID: body.id,
        photo: body.image,
      },
    });
    const updateUser = await prismaClient.user.update({
      where: {
        id: body.id,
      },
      data: {
        role: "user",
      },
    });
    const metadata = await clerk.users.updateUser(updateUser.userID, {
      privateMetadata: {
        role: "user",
      },
    });
    return new Response(JSON.stringify(createEmployee), { status: 200 });
  } catch (error) {
    console.log(error);
    console.log(error);
    return new Response("Unauthorized", { status: 401 });
  }
}
