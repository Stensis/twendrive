
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star, X } from 'lucide-react';
import { RatingSystemProps } from '@/lib/types';

const RatingSystem: React.FC<RatingSystemProps> = ({ car, onClose }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmitRating = () => {
    console.log('Rating submitted:', {
      carId: car.id,
      rating,
      review
    });
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Rate Your Experience</h2>
        <Button variant="ghost" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle>How was your experience with {car?.name}?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center">
            <img src={car?.images?.[0]} alt={car?.name} className="w-32 h-24 object-cover rounded-lg" />
          </div>

          <div className="text-center">
            <p className="text-lg font-semibold mb-4">Rate this vehicle</p>
            <div className="flex justify-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {rating === 0 && 'Click to rate'}
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share your experience (optional)
            </label>
            <Textarea
              placeholder="Tell others about your experience with this vehicle..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={handleSubmitRating}
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500"
              disabled={rating === 0}
            >
              Submit Rating
            </Button>
            <Button variant="outline" onClick={onClose}>
              Skip
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RatingSystem;
