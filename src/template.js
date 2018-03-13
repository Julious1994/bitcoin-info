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
          <link rel="stylesheet" href="/assets/style.css" />
          <link rel="stylesheet" href="/assets/bootstrap.min.css" />
          <link rel="stylesheet" href="/assets/themefisher-font.v-2/style.css"> 
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        
        <body>
          <div id="root">${body}</div>
        </body>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.3/socket.io.js"></script>
        <script src="/assets/bundle.js"></script>
        <script src="/assets/js/jquery.min.js"></script>
        <script src="/assets/js/popper.min.js"></script>
        <script src="/assets/js/script.js"></script>
        <script src="/assets/js/smooth-scroll.min.js"></script>
        <script src="/assets/js/bootstrap.min.js"></script>
    </html>
  `;
};
