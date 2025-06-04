import api from "./axios"

interface UpdateProfileData {
  firstName: string;
  lastName: string;
  profileImage?: {
    uri: string;
    type: string;
    name: string;
  };
}

export const updateProfile = async (data: UpdateProfileData) => {
  const formData = new FormData();
  formData.append('firstName', data.firstName);
  formData.append('lastName', data.lastName);
  if (data.profileImage) {
    formData.append('profileImage', data.profileImage); //mare2on as object
  }

  const response = await api.put('/api/user/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}; 
