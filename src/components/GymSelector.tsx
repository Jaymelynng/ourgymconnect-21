import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const gyms = [
  { id: 1, name: "Downtown Gym" },
  { id: 2, name: "Westside Location" },
  { id: 3, name: "South Center" },
];

export function GymSelector() {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a gym" />
      </SelectTrigger>
      <SelectContent>
        {gyms.map((gym) => (
          <SelectItem key={gym.id} value={gym.id.toString()}>
            {gym.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}