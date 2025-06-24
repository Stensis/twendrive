// EditCarPage.tsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CarData } from '@/lib/owner/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface EditCarPageProps {
  car: CarData;
}

const EditCarPage: React.FC<EditCarPageProps> = ({ car }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: car.name,
    price: String(car.price),
    location: car.location,
    description: car.description,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Replace with actual API call
    console.log('Saving updated car:', { ...car, ...formData });
    navigate('/owner-dashboard/cars');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Edit Car Details</h2>

      <div className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div>
          <Label>Price per Day (KSh)</Label>
          <Input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Location</Label>
          <Input name="location" value={formData.location} onChange={handleChange} />
        </div>

        <div>
          <Label>Description</Label>
          <textarea
            name="description"
            className="w-full border border-gray-300 rounded px-3 py-2"
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <Button onClick={handleSave} className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditCarPage;
