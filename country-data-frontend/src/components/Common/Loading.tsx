type LoadingProps = {
  message?: string;
};

export default function Loading({ message = "Loading..." }: LoadingProps) {
  return (
    <div className="flex justify-center items-center mt-6">
      <p className="text-blue-500 font-medium">{message}</p>
    </div>
  );
}
