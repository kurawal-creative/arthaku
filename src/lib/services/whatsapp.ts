// Mendefinisikan interface/tipe data berdasarkan respons API
export interface Device {
  id: string;
  display_name: string;
  state: string;
  jid: string;
  created_at: string;
}

export interface DevicesResponse {
  code: string;
  message: string;
  results: Device[] | null;
}

export class WhatsAppClient {
  private apiUrl: string;
  private authHeader: string;

  constructor() {
    // Mengambil konfigurasi dari .env
    this.apiUrl = process.env.WHATSAPP_API_URL || '';
    this.authHeader = process.env.WHATSAPP_AUTHENTICATION || '';

    // Validasi jika env tidak ditemukan
    if (!this.apiUrl || !this.authHeader) {
      throw new Error('Konfigurasi WHATSAPP_API_URL atau WHATSAPP_AUTHENTICATION tidak ditemukan di file .env');
    }
  }

  /**
   * Mengambil semua daftar device dari API
   */
  public async getDevices(): Promise<Device[]> {
    try {
      const response = await fetch(`${this.apiUrl}/devices`, {
        method: 'GET',
        headers: {
          'Authorization': this.authHeader,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = (await response.json()) as DevicesResponse;

      if (data.code === 'SUCCESS' && data.results) {
        return data.results;
      }

      return [];
    } catch (error) {
      console.error('Gagal mengambil daftar perangkat:', error);
      throw error;
    }
  }

  /**
   * Mengambil satu sesi (device) secara acak yang berstatus "logged_in"
   */
  public async getRandomActiveSession(): Promise<Device | null> {
    const devices = await this.getDevices();
    
    // Filter hanya device yang statusnya siap digunakan (logged_in)
    const activeDevices = devices.filter((device) => device.state === 'logged_in');

    if (activeDevices.length === 0) {
      console.warn('Tidak ada sesi yang sedang aktif (logged_in).');
      return null;
    }

    // Mengambil index secara acak
    const randomIndex = Math.floor(Math.random() * activeDevices.length);
    return activeDevices[randomIndex];
  }
}