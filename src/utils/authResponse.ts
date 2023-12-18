import { Expose } from 'class-transformer';

export class AuthResponse {
  @Expose({ name: 'control:Cleartext-Password' })
  'control:Cleartext-Password': string;

  @Expose({ name: 'Framed-IP-Address' })
  'Framed-IP-Address': string;

  @Expose({ name: 'Mikrotik-Rate-Limit' })
  'Mikrotik-Rate-Limit': string;

  constructor(password: string, ipAddress: string, rateLimit: string) {
    this['control:Cleartext-Password'] = password;
    this['Framed-IP-Address'] = ipAddress;
    this['Mikrotik-Rate-Limit'] = rateLimit;
  }
}

export function createMikrotikRateLimit(user: any) {
  const { plan } = user;
  const rateLimit = [
    plan.maxLimit,
    plan.burstLimit,
    plan.burstThreshold,
    plan.burstTime,
    plan.priority
  ].join(' ');

  return rateLimit;
}