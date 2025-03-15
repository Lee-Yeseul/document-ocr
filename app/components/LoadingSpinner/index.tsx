interface Props {
  text?: string;
}
export default function LoadingSpinner({ text }: Props) {
  return (
    <div className="fixed inset-0 flex flex-col gap-2 items-center justify-center bg-white/50 z-50">
      <div className="w-12 h-12 border-4 border-rose-300 border-t-transparent rounded-full animate-spin"></div>
      <div className="text-lg text-rose-400 font-semibold">{text}</div>
    </div>
  );
}
