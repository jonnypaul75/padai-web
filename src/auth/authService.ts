//import api from '../api/axios';

// export async function loginStaff(email: string, password: string) {
//   const response = await api.post('/auth/login', { email, password });
//   return response.data; // { id, name, role, token }
// }
export async function loginStaff(email: string, password: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin' && password === 'admin') {
          resolve({
            id: '1',
            name: 'Admin User',
            role: 'staff',
            token: 'dummy-token',
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  }