import React, { useState } from 'react';
import AddCarForm from '@/components/AddCarForm';

const AddCarPage = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  return (
    <div className="p-6">
      <AddCarForm selectedDates={selectedDates} setSelectedDates={setSelectedDates} />
    </div>
  );
};

export default AddCarPage;
