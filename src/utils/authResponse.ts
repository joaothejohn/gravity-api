import { Expose } from 'class-transformer';

export class AuthResponse {
  @Expose({ name: 'control:Cleartext-Password' })
  plainTextPassword: string;

  @Expose({ name: 'Framed-IP-Address' })
  framedIPAddress: string;

  @Expose({ name: 'Mikrotik-Rate-Limit' })
  mikrotikRateLimit: string;

  constructor(password: string) {
    this.plainTextPassword = password;
    this.framedIPAddress = '10.20.11.2';
    this.mikrotikRateLimit = '10M/10M 50M/50M 25M/25M 160/160 7 5M/5M';
  }
}