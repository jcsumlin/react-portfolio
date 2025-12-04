interface HCaptchaRequestBody {
  secret: string | undefined;
  response: string | null;
  remoteip: string | null;
}

const body: HCaptchaRequestBody = {
  secret: process.env.HCAPTCHA_SECRET_KEY,
  response: null,
  remoteip: null,
};

// {
//    "success": true|false,     // is the passcode valid, and does it meet security criteria you specified, e.g. sitekey?
//    "challenge_ts": timestamp, // timestamp of the challenge (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
//    "hostname": string,        // the hostname of the site where the challenge was passed
//    "credit": true|false,      // optional: deprecated field
//    "error-codes": [...]       // optional: any error codes
// }

interface HCaptchaResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  credit?: boolean;
  error?: string[];
}

export default async function verifyHCaptcha(
  remoteIp: string,
  responseToken: string,
): Promise<boolean> {
  body.response = responseToken;
  body.remoteip = remoteIp;

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  return fetch('https://api.hcaptcha.com/siteverify', requestOptions)
    .then(async (response) => {
      const data: HCaptchaResponse = await response.json();
      if (data.success) {
        return true;
      } else {
        console.error('hCaptcha verification failed:', data.error);
        return false;
      }
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
}
