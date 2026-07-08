export default function TacticNote({ children }) {
  return (
    <div className="mt-1 rounded border border-dashed border-amber-500 bg-amber-50 px-2 py-1 text-xs text-amber-800">
      <strong>Phishing tactic:</strong> {children}
    </div>
  );
}
