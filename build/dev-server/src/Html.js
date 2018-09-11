module.exports = function Html({ scripts }) {
  return `<html>
      <head>
        <title>Verdigris (Dev)</title>
      </head>
      <body>
        <div id="app" />
        ${scripts
          .map(scriptUrl => `<script src="${scriptUrl}"></script>`)
          .join('')}
        <script>
          var appEl = document.getElementById('app');
          App.render(appEl);
        </script>
      </body>
    </html>`;
};
