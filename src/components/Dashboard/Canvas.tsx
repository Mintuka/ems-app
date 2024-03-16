type Props = {
  children: React.ReactNode;
};
function Canvas({ children }: Props) {
  return (
    <div className="flex flex-1 flex-col p-6 pb-8">
      <div className="bg-base-100 p-4 pt-8 rounded-lg flex flex-col gap-8 flex-1">
        {children}
      </div>
    </div>
  );
}
export default Canvas;
