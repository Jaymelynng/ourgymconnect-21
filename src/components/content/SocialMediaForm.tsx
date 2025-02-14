
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import RichTextEditor from '@/components/RichTextEditor';

interface SocialMediaFormProps {
  onCancel: () => void;
}

export const SocialMediaForm = ({ onCancel }: SocialMediaFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');
  const [contentDate, setContentDate] = useState<Date>(new Date());
  const [focus, setFocus] = useState('');
  const [description, setDescription] = useState('');
  const [caption, setCaption] = useState('');
  const [contentType, setContentType] = useState<'photos' | 'video' | 'canvas'>('photos');
  const [photoCount, setPhotoCount] = useState<string>('');
  const [tasks, setTasks] = useState<{
    id: number;
    task: string;
    description: string;
    dueDate: Date;
    assignedTo: string;
  }[]>([]);

  const staffMembers = [
    { value: 'all-gyms', label: 'All Gyms' },
    { value: 'jayme', label: 'Jayme' },
    { value: 'morgan', label: 'Morgan' },
    { value: 'sara', label: 'Sara' },
    { value: 'kim', label: 'Kim' },
  ];

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      task: '',
      description: '',
      dueDate: new Date(),
      assignedTo: '',
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="sm:max-w-[800px] bg-background">
        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </div>

            <div>
              <Label>Content Live Date</Label>
              <Input
                type="date"
                value={contentDate.toISOString().split('T')[0]}
                onChange={(e) => setContentDate(new Date(e.target.value))}
              />
            </div>

            <div>
              <Label>Focus/Category</Label>
              <Input
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                placeholder="Enter focus or category"
              />
            </div>

            <div>
              <Label>Description</Label>
              <RichTextEditor
                content={description}
                onChange={setDescription}
              />
            </div>

            <div>
              <Label>Caption</Label>
              <RichTextEditor
                content={caption}
                onChange={setCaption}
              />
            </div>
          </div>

          <div className="p-6 rounded-lg border">
            <Label className="text-lg font-semibold mb-4 block">Key Visuals</Label>
            <RadioGroup
              defaultValue="photos"
              value={contentType}
              onValueChange={(value) => setContentType(value as 'photos' | 'video' | 'canvas')}
              className="flex space-x-6"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="photos" id="photos" />
                  <Label htmlFor="photos">Photo Post</Label>
                </div>
                {contentType === 'photos' && (
                  <div className="ml-6">
                    <Input
                      type="number"
                      placeholder="Number of photos needed"
                      value={photoCount}
                      onChange={(e) => setPhotoCount(e.target.value)}
                      className="w-40"
                    />
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video">Video Post</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="canvas" id="canvas" />
                <Label htmlFor="canvas">Canvas Template</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold">Tasks</Label>
              <button
                type="button"
                onClick={handleAddTask}
                className="text-primary hover:text-primary-hover"
              >
                + Add Task
              </button>
            </div>
            
            {tasks.map((task, index) => (
              <div key={task.id} className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
                <div>
                  <Label>Task</Label>
                  <Input
                    value={task.task}
                    onChange={(e) => {
                      const updatedTasks = [...tasks];
                      updatedTasks[index].task = e.target.value;
                      setTasks(updatedTasks);
                    }}
                    placeholder="Short task description"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Input
                    value={task.description}
                    onChange={(e) => {
                      const updatedTasks = [...tasks];
                      updatedTasks[index].description = e.target.value;
                      setTasks(updatedTasks);
                    }}
                    placeholder="Detailed description"
                  />
                </div>
                <div>
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={task.dueDate.toISOString().split('T')[0]}
                    onChange={(e) => {
                      const updatedTasks = [...tasks];
                      updatedTasks[index].dueDate = new Date(e.target.value);
                      setTasks(updatedTasks);
                    }}
                  />
                </div>
                <div>
                  <Label>Assigned To</Label>
                  <Select
                    value={task.assignedTo}
                    onValueChange={(value) => {
                      const updatedTasks = [...tasks];
                      updatedTasks[index].assignedTo = value;
                      setTasks(updatedTasks);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select person" />
                    </SelectTrigger>
                    <SelectContent>
                      {staffMembers.map((member) => (
                        <SelectItem key={member.value} value={member.value}>
                          {member.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
