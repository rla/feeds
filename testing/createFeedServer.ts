import { createServer, Server } from 'http';

const FEED = `
  <feed>
    <title>Test</title>
    <author>Feed author</author>
    <entry>
      <title>Test entry</title>
      <id>http://example.com/1</id>
      <link>http://example.com/1</link>
      <updated>2018-12-30T00:00:00+00:00</updated>
      <content type="html">Feed content</content>
    </entry>
  </feed>
`;

/**
 * Creates an HTTP server that serves the given
 * feed on the specified port.
 */
export default (port: number) => {
  return new Promise<Server>((resolve, reject) => {
    const server = createServer((req, res) => {
      res.end(FEED);
    });
    server.listen(port, (err: Error) => {
      if (err) {
        reject(err);
      } else {
        resolve(server);
      }
    });
  });
};
