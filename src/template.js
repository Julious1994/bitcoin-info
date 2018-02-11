export default ({ body, title, initialState }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <script>window.__APP_INITIAL_STATE__ = ${initialState}</script>
        <title>${title}</title>
        <link rel="stylesheet" type="text/css" href="https://unpkg.com/medium-draft/dist/medium-draft.css"><link rel="stylesheet" type="text/css" href="https://unpkg.com/medium-draft/dist/medium-draft.css">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css">
        <link rel="stylesheet" href="/assets/index.css" />
      </head>
      
      <body>
        <div id="root">${body}</div>
      </body>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>
      <script src="/assets/bundle.js"></script>
    </html>
  `;
};
