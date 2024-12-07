import api from '@/utils/api';
import { ProfileData } from '@/types/user';

class UserService {
  getMe: () => Promise<ProfileData> = async () => {
    const response = await api.get('/api/User/me');
    const data = response.data.Data;
    console.log(data);
    return {
      id: data.StudentId ?? data.TeacherId,
      fullname: data.Fullname,
      email: data.ContactEmail ?? data.Email,
      dob: data.DateOfBirth,
      userId: data.UserId,
    };
  };
}

export default UserService;
