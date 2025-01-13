interface SpeedSliderProps {
  speed: number;
  onChange: (value: number) => void;
}

export default function SpeedSlider({ speed, onChange }: SpeedSliderProps) {
  return (
    <div className="w-full max-w-xs px-4">
      <label className="block text-base text-gray-700 mb-1 text-center">
        アニメーション速度: {speed}秒
      </label>
      <input
        type="range"
        min="1"
        max="10"
        step="0.5"
        value={speed}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}