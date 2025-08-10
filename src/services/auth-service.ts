import axios from 'axios';

class AuthService {
  async signIn(message: string, publicKey: string, signature: string) {
    const response = await axios.post('/api/auth/sign', { message, publicKey, signature });
    return response.data;
  }
  async logout() {
    const response = await axios.post('/api/auth/logout');
    return response.data;
  }
}

export default new AuthService();
