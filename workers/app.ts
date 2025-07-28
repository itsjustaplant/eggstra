import { createRequestHandler } from "react-router";
import {
  PROTEIN_MULTIPLIER_MAP,
  WATER_MULTIPLIER_MAP,
  WEIGHT,
} from "~/constants";
import { TEXTS } from "~/texts";
import type { TDailyData } from "~/types";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  fetch(request, env, ctx) {
    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },

  async scheduled(_, env) {
    try {
      const { results } = await env.DB.prepare(
        `SELECT * FROM DailyData ORDER BY Date DESC LIMIT 1`
      ).all<TDailyData>();
      const { protein, water } = results[0];
      const maintanenceProtein = WEIGHT * PROTEIN_MULTIPLIER_MAP.maintanence;
      const maintanenceWater = WEIGHT * WATER_MULTIPLIER_MAP.maintanence;
      const proteinDiff = protein - maintanenceProtein;
      const waterDiff = water - maintanenceWater;

      let text = TEXTS["email-failure"];

      if (proteinDiff <= 0 && waterDiff <= 0) {
        text = TEXTS["email-success"].replace("{protein}", `${protein}`).replace("{water}", `${water}`);
      }

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "noreply@justaplant.dev",
          to: "alperensahin442@gmail.com",
          subject: `Eggstra daily reminder`,
          html: `
            <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html dir="ltr" lang="en">
              <head>
                <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                <meta name="x-apple-disable-message-reformatting" />
              </head>
              <body
                style='background-color:rgb(243,244,246);font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";padding-top:40px;padding-bottom:40px'>
                <!--$-->
                <table
                  align="center"
                  width="100%"
                  border="0"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="background-color:rgb(255,255,255);border-radius:8px;padding:40px;max-width:600px;margin-left:auto;margin-right:auto">
                  <tbody>
                    <tr style="width:100%">
                      <td>
                        <table
                          align="center"
                          width="100%"
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          role="presentation"
                          style="text-align:center">
                          <tbody>
                            <tr>
                              <td>
                                <div style="margin-bottom:32px">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M239.71,125l-16.42-88a16,16,0,0,0-19.61-12.58l-.31.09L150.85,40h-45.7L52.63,24.56l-.31-.09A16,16,0,0,0,32.71,37.05L16.29,125a15.77,15.77,0,0,0,9.12,17.52A16.26,16.26,0,0,0,32.12,144,15.48,15.48,0,0,0,40,141.84V184a40,40,0,0,0,40,40h96a40,40,0,0,0,40-40V141.85a15.5,15.5,0,0,0,7.87,2.16,16.31,16.31,0,0,0,6.72-1.47A15.77,15.77,0,0,0,239.71,125ZM32,128h0L48.43,40,90.5,52.37Zm144,80H136V195.31l13.66-13.65a8,8,0,0,0-11.32-11.32L128,180.69l-10.34-10.35a8,8,0,0,0-11.32,11.32L120,195.31V208H80a24,24,0,0,1-24-24V123.11L107.92,56h40.15L200,123.11V184A24,24,0,0,1,176,208Zm48-80L165.5,52.37,207.57,40,224,128ZM104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm72,0a12,12,0,1,1-12-12A12,12,0,0,1,176,140Z"></path></svg>
                                </div>
                                <p
                                  style="color:rgb(31,41,55);font-size:20px;line-height:28px;font-weight:500;margin:0px;margin-bottom:0px;margin-top:0px;margin-left:0px;margin-right:0px">
                                  You&#x27;ve got
                                  <!-- -->${text}<!-- -->
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!--7--><!--/$-->
              </body>
            </html>
          `,
        }),
      });
      if (!response.ok) {
        const error = await response.text();
        console.error("Failed to send email:", error);
      } else {
        console.log("Email sent successfully 🎉");
      }
    } catch (e) {
      console.log(e);
    }
  },
} satisfies ExportedHandler<Env>;
