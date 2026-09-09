#!/usr/bin/env python3
"""Serve a source checkout or generated site locally with JavaScript MIME types."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, '.mjs':'text/javascript', '.js':'text/javascript'}

    def end_headers(self):
        self.send_header('Cache-Control','no-store')
        super().end_headers()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port',type=int,default=8899)
    parser.add_argument('--directory',type=Path,default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    with ThreadingHTTPServer(('127.0.0.1',args.port),partial(Handler,directory=str(args.directory.resolve()))) as server:
        print(f'Preview: http://127.0.0.1:{args.port}/ — keep this process running; Ctrl+C stops it.',flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
