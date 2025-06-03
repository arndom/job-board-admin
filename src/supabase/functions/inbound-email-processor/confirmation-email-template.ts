export const confirmationEmailTemplate = (name: string, email: string, company: string, title: string) => {
  const template = `
  <div>
  <div style="margin:0px auto;max-width:600px">
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
      style="width:100%;border-collapse:collapse">
      <tbody>
        <tr>
          <td style="direction:ltr;font-size:0;padding:20px 0 8px;text-align:center;border-collapse:collapse">
            <div class="m_658369431014232858mj-column-per-100"
              style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                style="border-collapse:collapse">
                <tbody>
                  <tr>
                    <td style="vertical-align:top;padding-top:60px;border-collapse:collapse">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                        style="border-collapse:collapse">
                        <tbody>
                          <tr>
                            <td align="center"
                              style="font-size:0;padding:0;border-collapse:collapse;font-size:0;padding:0;border-collapse:collapse;font-size:0px;padding:0;word-break:break-word">
                              <div
                                style="font-family:GT Haptik,sans-serif;font-size:18px;font-weight:500;line-height:20px;text-align:center;color:black">
                                Thank you for applying</div>
                            </td>
                          </tr>
                          <tr>
                            <td align="center"
                              style="font-size:0;padding:20px 25px 0;border-collapse:collapse;font-size:0;padding:20px 25px 0;border-collapse:collapse;font-size:0px;padding:10px 25px;padding-top:20px;padding-bottom:0px;word-break:break-word">
                              <div
                                style="font-family:Inter,sans-serif;font-size:14px;line-height:21px;text-align:center;color:black">
                                Your application was submitted successfully.</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div style="margin:0px auto;max-width:600px">
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
      style="width:100%;border-collapse:collapse">
      <tbody>
        <tr>
          <td style="direction:ltr;font-size:0;padding:20px 0;text-align:center;border-collapse:collapse">
            <div class="m_658369431014232858mj-column-per-67"
              style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                style="border-collapse:collapse">
                <tbody>
                  <tr>
                    <td
                      style="background-color:#f4f3f5;border-radius:8px;vertical-align:top;padding:24px;border-collapse:collapse">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                        style="border-collapse:collapse">
                        <tbody>
                          <tr>
                            <td align="left"
                              style="font-size:0;padding:0;border-collapse:collapse;font-size:0;padding:0;border-collapse:collapse;font-size:0px;padding:0;word-break:break-word">
                              <div
                                style="font-family:Inter,sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000">
                                <b>Name:</b> ${name}</div>
                            </td>
                          </tr>
                          <tr>
                            <td align="left"
                              style="font-size:0;padding:9px 0;border-collapse:collapse;font-size:0;padding:9px 0;border-collapse:collapse;font-size:0px;padding:9px 0 9px 0;word-break:break-word">
                              <div
                                style="font-family:Inter,sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000">
                                <b>Email:</b> <a href="mailto:reconstr.dev@gmail.com"
                                  target="_blank">${email}</a></div>
                            </td>
                          </tr>
                          <tr>
                            <td align="left"
                              style="font-size:0;padding:0 0 9px;border-collapse:collapse;font-size:0;padding:0 0 9px;border-collapse:collapse;font-size:0px;padding:0 0 9px 0;word-break:break-word">
                              <div
                                style="font-family:Inter,sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000">
                                <b>Job Role:</b> ${title}</div>
                            </td>
                          </tr>
                          <tr>
                            <td align="left"
                              style="font-size:0;padding:0;border-collapse:collapse;font-size:0;padding:0;border-collapse:collapse;font-size:0px;padding:0;word-break:break-word">
                              <div
                                style="font-family:Inter,sans-serif;font-size:14px;line-height:1;text-align:left;color:#000000">
                                <b>Company:</b> ${company}</div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  `

  return template
}
