
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, CheckCircle, AlertTriangle, Upload, Camera, FileText, User, Car, CreditCard } from 'lucide-react';
import { VerificationSystemProps } from '@/lib/owner/types';

const VerificationSystem: React.FC<VerificationSystemProps> = ({ userType, onVerificationComplete }) => {
  const [verificationStatus, setVerificationStatus] = useState({
    identity: false,
    drivingLicense: false,
    insurance: false,
    vehicleRegistration: userType === 'renter' ? true : false, // Only required for owners
    businessLicense: userType === 'renter' ? true : false, // Only required for owners
    bankAccount: false,
    phoneVerification: false,
    emailVerification: true
  });

  const [uploadedDocs, setUploadedDocs] = useState({
    nationalId: false,
    drivingLicense: false,
    insurance: false,
    vehicleRegistration: false,
    businessLicense: false,
    bankStatement: false,
    selfie: false
  });

  const getVerificationProgress = () => {
    const required = userType === 'owner' ? 8 : 6;
    const completed = Object.values(verificationStatus).filter(Boolean).length;
    return Math.round((completed / required) * 100);
  };

  const handleDocumentUpload = (docType: string) => {
    setUploadedDocs(prev => ({ ...prev, [docType]: true }));
    
    // Update verification status based on document upload
    switch (docType) {
      case 'nationalId':
        setVerificationStatus(prev => ({ ...prev, identity: true }));
        break;
      case 'drivingLicense':
        setVerificationStatus(prev => ({ ...prev, drivingLicense: true }));
        break;
      case 'insurance':
        setVerificationStatus(prev => ({ ...prev, insurance: true }));
        break;
      case 'vehicleRegistration':
        setVerificationStatus(prev => ({ ...prev, vehicleRegistration: true }));
        break;
      case 'businessLicense':
        setVerificationStatus(prev => ({ ...prev, businessLicense: true }));
        break;
      case 'bankStatement':
        setVerificationStatus(prev => ({ ...prev, bankAccount: true }));
        break;
    }
  };

  const progress = getVerificationProgress();

  return (
    <div className="space-y-6">
      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-orange-600" />
            <span>{userType === 'owner' ? 'Owner' : 'Renter'} Verification</span>
            <Badge className={progress === 100 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
              {progress}% Complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {progress < 100 && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Verification Required:</strong> Complete your verification to {userType === 'owner' ? 'list vehicles and receive bookings' : 'book verified vehicles'}.
                Only verified {userType === 'owner' ? 'owners can list vehicles' : 'users can book premium vehicles'}.
              </AlertDescription>
            </Alert>
          )}

          {progress === 100 && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Verification Complete!</strong> You're fully verified and can access all features.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {/* Identity Verification */}
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">Identity Verification</span>
                  </div>
                  {verificationStatus.identity ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">National ID</span>
                    {uploadedDocs.nationalId ? (
                      <Badge className="bg-green-100 text-green-800">Uploaded</Badge>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleDocumentUpload('nationalId')}>
                        <Upload className="h-3 w-3 mr-1" />
                        Upload
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Selfie Verification</span>
                    {uploadedDocs.selfie ? (
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleDocumentUpload('selfie')}>
                        <Camera className="h-3 w-3 mr-1" />
                        Take Photo
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Driving License */}
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">Driving License</span>
                  </div>
                  {verificationStatus.drivingLicense ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Upload front and back of your driving license
                </div>
                {uploadedDocs.drivingLicense ? (
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => handleDocumentUpload('drivingLicense')}>
                    <Upload className="h-3 w-3 mr-1" />
                    Upload License
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Insurance */}
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">Insurance</span>
                  </div>
                  {verificationStatus.insurance ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {userType === 'owner' ? 'Vehicle insurance certificate' : 'Personal insurance (optional)'}
                </div>
                {uploadedDocs.insurance ? (
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => handleDocumentUpload('insurance')}>
                    <Upload className="h-3 w-3 mr-1" />
                    Upload Insurance
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Bank Account */}
            <Card className="border border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-gray-600" />
                    <span className="font-medium">Bank Account</span>
                  </div>
                  {verificationStatus.bankAccount ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  Bank statement for {userType === 'owner' ? 'payment disbursement' : 'payment verification'}
                </div>
                {uploadedDocs.bankStatement ? (
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => handleDocumentUpload('bankStatement')}>
                    <Upload className="h-3 w-3 mr-1" />
                    Upload Statement
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Owner-specific verifications */}
            {userType === 'owner' && (
              <>
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Car className="h-4 w-4 text-gray-600" />
                        <span className="font-medium">Vehicle Registration</span>
                      </div>
                      {verificationStatus.vehicleRegistration ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Vehicle logbook and registration documents
                    </div>
                    {uploadedDocs.vehicleRegistration ? (
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleDocumentUpload('vehicleRegistration')}>
                        <Upload className="h-3 w-3 mr-1" />
                        Upload Registration
                      </Button>
                    )}
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-600" />
                        <span className="font-medium">Business License</span>
                      </div>
                      {verificationStatus.businessLicense ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Business permit or trading license (if applicable)
                    </div>
                    {uploadedDocs.businessLicense ? (
                      <Badge className="bg-green-100 text-green-800">Verified</Badge>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleDocumentUpload('businessLicense')}>
                        <Upload className="h-3 w-3 mr-1" />
                        Upload License
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {progress === 100 && onVerificationComplete && (
            <Button 
              onClick={onVerificationComplete}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete Verification
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationSystem;
