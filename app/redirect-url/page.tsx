import { google } from "googleapis";
import { cookies } from "next/headers";

export default async function RedirectUrl({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { code } = await searchParams;
  const cookie = await cookies();

  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  const setToken = async () => {
    try {
      if (!code) return;

      const { tokens } = await oauth2Client.getToken(code);
      const { access_token } = tokens;
      console.log("tokens", tokens);
      if (!access_token) return;
      //   cookie.set("refresh_token", refresh_token);
      cookie.set("access_token", access_token);
    } catch (e) {
      console.log("this is errors", e);
    }
  };

  setToken();

  return <div></div>;
}
