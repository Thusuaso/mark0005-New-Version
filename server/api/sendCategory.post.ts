export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const email = String(body?.email ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid email" });
  }
  {
    const html = `
<html
  dir="ltr"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns="http://www.w3.org/1999/xhtml"
>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no" />
    <title></title>
    <!--[if (mso 16)]>
      <style type="text/css">
        a {
          text-decoration: none;
        }
      </style>
    <![endif]-->
    <!--[if gte mso 9]>
      <style>
        sup {
          font-size: 100% !important;
        }
      </style>
    <![endif]-->
    <!--[if gte mso 9]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG></o:AllowPNG>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
    <![endif]-->
    <!--[if mso
      ]><xml>
        <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
          <w:DontUseAdvancedTypographyReadingMail />
        </w:WordDocument> </xml
    ><![endif]-->
  </head>
  <body class="body">
    <div dir="ltr" class="es-wrapper-color">
      <!--[if gte mso 9]>
        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
          <v:fill type="tile" color="#f6f6f6"></v:fill>
        </v:background>
      <![endif]-->
      <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper">
        <tbody>
          <tr>
            <td valign="top" class="esd-email-paddings">
              <table
                cellspacing="0"
                cellpadding="0"
                align="center"
                class="esd-header-popover es-header"
              >
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table
                        align="center"
                        width="600"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        class="es-header-body"
                      >
                        <tbody>
                          <tr>
                            <td
                              align="left"
                              class="es-p20t es-p20r es-p20l esd-structure"
                            >
                              <!--[if mso]>
                                             <table width="560" cellpadding="0"
                                                cellspacing="0">
                                                <tr>
                                                   <td width="180" valign="top">
                                                      <![endif]-->
                              <table
                                align="left"
                                cellspacing="0"
                                cellpadding="0"
                                class="es-left"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="180"
                                      valign="top"
                                      align="center"
                                      class="es-m-p20b esd-container-frame"
                                    >
                                      <table
                                        cellspacing="0"
                                        cellpadding="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              class="esd-block-image es-p45t"
                                              style="font-size: 0"
                                            >
                                              <a
                                                target="_blank"
                                                href="https://mekmar-image.fra1.digitaloceanspaces.com/category/catalog-2025.pdf"
                                              >
                                                <img
                                                  src="https://cdn.mekmarimage.com/logo/DOWNLOAD%20OUR%20CATALOG%20FROM%20HERE%20(1).gif"
                                                  alt=""
                                                  width="580"
                                                  height="150"
                                                  class="adapt-img"
                                                  style="padding-top: 30px"
                                                />
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]>
                                                   </td>
                                                   <td width="20"></td>
                                                   <td width="360" valign="top">
                                                      <![endif]-->

                              <!--[if mso]>
                                                   </td>
                                                </tr>
                                             </table>
                                             <![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                style="
                  border: 1px solid gray;
                  width: 50%;
                  text-align: center;
                  margin: 0px auto;
                  margin-top: 25px;
                "
              ></div>
              <table
                cellspacing="0"
                cellpadding="0"
                align="center"
                class="es-content"
                style="margin-top: 25px"
              >
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table
                        bgcolor="#ffffff"
                        align="center"
                        width="600"
                        cellspacing="0"
                        cellpadding="0"
                        class="es-content-body"
                      >
                        <tbody>
                          <tr>
                            <td
                              align="left"
                              class="es-p20t es-p20r es-p20l esd-structure"
                            >
                              <table
                                cellpadding="0"
                                width="100%"
                                cellspacing="0"
                                style="
                                  border-bottom: 1px solid gray;
                                  padding-bottom: 15px;
                                  width: 100%;
                                "
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      width="560"
                                      valign="top"
                                      align="center"
                                      class="esd-container-frame"
                                    >
                                      <table
                                        cellspacing="0"
                                        cellpadding="0"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              class="esd-block-button"
                                              style="text-align: justify"
                                            >
                                              <span class="es-button-border">
                                                MEKMAR is producing and
                                                supplying the best and
                                                high-quality natural stone
                                                products since 2002. We aim the
                                                best quality, the best service,
                                                and the highest customer
                                                satisfaction until the delivery
                                                of products. Our experienced
                                                sales team update you about
                                                payment, production and
                                                shipments steps by steps.
                                                <!-- <a
                                                  href="https://cdn.mekmarimage.com/category/catalog-2025.pdf"
                                                  target="_blank"
                                                  class="es-button"
                                                >
                                                  Click For Catalog
                                                </a> -->
                                              </span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>

                          <tr>
                            <td
                              align="left"
                              class="esd-structure es-p20t es-p20r es-p20l"
                              style="
                                border-bottom: 1px solid gray;
                                padding-bottom: 10px;
                              "
                            >
                              <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="150" valign="top"><![endif]-->
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="es-left"
                                style="margin-top: 10px"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      align="left"
                                      width="150"
                                      class="esd-container-frame"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              class="esd-block-image"
                                              style="font-size: 0"
                                            >
                                              <a target="_blank">
                                                <img
                                                  src="https://fwknjce.stripocdn.email/content/guids/CABINET_6a119a8ebec252c9b4f40555c7629028894196e5950d3839e0ae62dc44270949/images/gizemyeni.jpg"
                                                  alt=""
                                                  width="110"
                                                  height="110"
                                                />
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td><td width="20"></td><td width="390" valign="top"><![endif]-->
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                align="right"
                                class="es-right"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      align="left"
                                      width="320"
                                      class="esd-container-frame es-m-p20b"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                        style="margin-top: 12px"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="left"
                                              class="esd-block-text"
                                              style="
                                                font-weight: bold;
                                                padding-bottom: 5px;
                                                padding-top: 7px;
                                              "
                                            >
                                              Gizem ÜLKER
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="left"
                                              class="esd-block-text"
                                              style="padding-bottom: 5px"
                                            >
                                              Sales Specialist
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="left"
                                              class="esd-block-text"
                                              style="padding-bottom: 5px"
                                            >
                                              <a
                                                style="text-decoration: none"
                                                href="mailto:export@mekmar.com"
                                                >export@mekmar.com</a
                                              >
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="left"
                                              class="esd-block-text"
                                            >
                                              <a
                                                style="text-decoration: none"
                                                href="https://web.whatsapp.com/send?phone=905426608087"
                                                >+90 542 660 8087</a
                                              >
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td></tr></table><![endif]-->
                            </td>
                          </tr>

                          <tr>
                            <td
                              style="
                                border-bottom: 1px solid gray;
                                padding-bottom: 10px;
                              "
                              align="left"
                              class="esd-structure es-p20t es-p20r es-p20l"
                            >
                              <!--[if mso]><table width="560" cellpadding="0" cellspacing="0"><tr><td width="150" valign="top"><![endif]-->
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                align="left"
                                class="es-left"
                                style="margin-top: 10px"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      align="left"
                                      width="150"
                                      class="esd-container-frame"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              class="esd-block-image"
                                              style="font-size: 0"
                                            >
                                              <a target="_blank">
                                                <img
                                                  src="https://fwknjce.stripocdn.email/content/guids/CABINET_6a119a8ebec252c9b4f40555c7629028894196e5950d3839e0ae62dc44270949/images/ozlemyeni2.jpg"
                                                  alt=""
                                                  width="110"
                                                  height="110"
                                                />
                                              </a>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td><td width="20"></td><td width="390" valign="top"><![endif]-->
                              <table
                                cellpadding="0"
                                cellspacing="0"
                                align="right"
                                class="es-right"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      align="left"
                                      width="320"
                                      class="esd-container-frame es-m-p20b"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                        style="margin-top: 12px"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="left"
                                              class="esd-block-text"
                                              style="
                                                font-weight: bold;
                                                padding-bottom: 5px;
                                                padding-top: 7px;
                                              "
                                            >
                                              Özlem OKUT
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="left"
                                              class="esd-block-text"
                                              style="padding-bottom: 5px"
                                            >
                                              Sales Specialist
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="left"
                                              class="esd-block-text"
                                              style="padding-bottom: 5px"
                                            >
                                              <a
                                                style="text-decoration: none"
                                                href="mailto:export1@mekmar.com"
                                                >export1@mekmar.com</a
                                              >
                                            </td>
                                          </tr>
                                          <tr>
                                            <td
                                              align="left"
                                              class="esd-block-text"
                                            >
                                              <a
                                                style="text-decoration: none"
                                                href="https://web.whatsapp.com/send?phone=905426608085"
                                                >+90 542 660 8085</a
                                              >
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <!--[if mso]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                          <tr></tr>
                          <tr></tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table
                cellspacing="0"
                cellpadding="0"
                align="center"
                class="esd-footer-popover es-footer"
                style="padding-top: 25px"
              >
                <tbody>
                  <tr>
                    <td align="center" class="esd-stripe">
                      <table
                        width="600"
                        cellspacing="0"
                        cellpadding="0"
                        bgcolor="#ffffff"
                        align="center"
                        class="es-footer-body"
                      >
                        <tbody>
                          <tr></tr>
                          <tr>
                            <td
                              align="left"
                              class="esd-structure es-p20t es-p20r es-p20l"
                            >
                              <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                style="margin-bottom: 10px"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      align="left"
                                      width="560"
                                      class="esd-container-frame"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              class="esd-block-social"
                                              style="font-size: 0"
                                            >
                                              <table
                                                cellpadding="0"
                                                cellspacing="0"
                                                class="es-table-not-adapt es-social"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      class="es-p10r"
                                                    >
                                                      <a
                                                        target="_blank"
                                                        href="https://www.facebook.com/mekmar"
                                                      >
                                                        <img
                                                          title="Facebook"
                                                          src="https://fwknjce.stripocdn.email/content/assets/img/social-icons/rounded-colored-bordered/facebook-rounded-colored-bordered.png"
                                                          alt="Fb"
                                                          width="32"
                                                          height="32"
                                                        />
                                                      </a>
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      class="es-p10r"
                                                    >
                                                      <a
                                                        target="_blank"
                                                        href="https://x.com/MekmarMarble"
                                                      >
                                                        <img
                                                          title="X"
                                                          src="https://fwknjce.stripocdn.email/content/assets/img/social-icons/rounded-colored-bordered/x-rounded-colored-bordered.png"
                                                          alt="X"
                                                          width="32"
                                                          height="32"
                                                        />
                                                      </a>
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      class="es-p10r"
                                                    >
                                                      <a
                                                        target="_blank"
                                                        href="https://www.instagram.com/mekmarnaturalstone"
                                                      >
                                                        <img
                                                          title="Instagram"
                                                          src="https://fwknjce.stripocdn.email/content/assets/img/social-icons/rounded-colored-bordered/instagram-rounded-colored-bordered.png"
                                                          alt="Ig"
                                                          width="32"
                                                          height="32"
                                                        />
                                                      </a>
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      class="es-p10r"
                                                    >
                                                      <a
                                                        target="_blank"
                                                        href="https://www.youtube.com/channel/UCYz9dfb0A44hUzNiMwNQQFA"
                                                      >
                                                        <img
                                                          title="YouTube"
                                                          src="https://fwknjce.stripocdn.email/content/assets/img/social-icons/rounded-colored-bordered/youtube-rounded-colored-bordered.png"
                                                          alt="Yt"
                                                          width="32"
                                                          height="32"
                                                        />
                                                      </a>
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                      class="es-p10r"
                                                    >
                                                      <a
                                                        target="_blank"
                                                        href="https://tr.pinterest.com/export10499"
                                                      >
                                                        <img
                                                          title="Pinterest"
                                                          src="https://fwknjce.stripocdn.email/content/assets/img/social-icons/rounded-colored-bordered/pinterest-rounded-colored-bordered.png"
                                                          alt="P"
                                                          width="32"
                                                          height="32"
                                                        />
                                                      </a>
                                                    </td>
                                                    <td
                                                      align="center"
                                                      valign="top"
                                                    >
                                                      <a
                                                        target="_blank"
                                                        href="https://www.linkedin.com/company/mekmar-marble-and-travertine"
                                                      >
                                                        <img
                                                          title="LinkedIn"
                                                          src="https://fwknjce.stripocdn.email/content/assets/img/social-icons/rounded-colored-bordered/linkedin-rounded-colored-bordered.png"
                                                          alt="In"
                                                          width="32"
                                                          height="32"
                                                        />
                                                      </a>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="left"
                              class="esd-structure es-p20t es-p20r es-p20l"
                              style="margin-bottom: 10px"
                            >
                              <table
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      align="left"
                                      width="560"
                                      class="esd-container-frame"
                                    >
                                      <table
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              align="center"
                                              class="esd-block-text"
                                            >
                                              <p>
                                                <strong
                                                  >Mekmar Natural Stone |
                                                  www.mekmar.com</strong
                                                >
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>




      `;
    const html_2 = `
      <h1>Mekmar.com katalog indiren mail adresi => ${escapeHtml(email)}</h1>
    `;

    /* Bilgi islem bildirimi musteriye giden maili engellemesin */
    mailTransporter
      .sendMail({
        from: MAIL_FROM,
        to: "bilgiislem@mekmar.com",
        subject: "Mekmar.com Katalog Indirenler",
        html: html_2,
      })
      .catch((err: unknown) => console.error("Catalog notify mail failed:", err));

    try {
      await mailTransporter.sendMail({
        from: `"Mekmar" <${MAIL_FROM}>`,
        to: email,
        subject: "Mekmar.com Catalog",
        html,
      });
      return true;
    } catch (err) {
      console.error("Catalog mail failed:", err);
      throw createError({ statusCode: 500, statusMessage: "Mail could not be sent" });
    }
  }
});
