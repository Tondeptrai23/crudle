import { useQuery } from '@tanstack/react-query';
import api from '@/utils/api';

interface ProfileData {
  Email: string;
  StudentId: number;
  Fullname: string;
  DateOfBirth: string;
  UserId: string;
  Role: string;
}

const fetchProfileData = async (): Promise<ProfileData> => {
  const response = await api.get<{ Success: boolean; Data: ProfileData }>(
    '/api/User/me',
  );
  return response.data.Data;
};

export const useProfileData = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfileData,
  });
};
