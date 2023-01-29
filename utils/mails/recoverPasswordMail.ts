export const recoverPasswordMail = `
<div style="margin-left:auto;margin-right:auto;height:full;">
  <div style="padding-top:12px;padding-bottom:12px;">
    <h3 style="font-size:23px;margin:0;padding-bottom:4px;">{hello}, {username}!</h3>
    <p style="color:#525252;font-size:15px;margin:0;">{description}</p>
  </div>
  <a style="color:#1e81b0;font-size:17px;text-decoration:underline;" target="_blank" href="{resetUri}">{redirectText}</a>
</div>
`