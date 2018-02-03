hướng dẫn cài đặt:
https://socket.io/docs/
https://expressjs.com/en/starter/generator.html
https://socket.io/docs/client-api/

1. server
- dùng expressjs: express --view=pug myapp
- cài đặt socket.io: npm install socket.io

2. Client
- Mở kết nối đến server: const socket = io('http://localhost');


-> thao tác ta học xem thêm:
emit, on, broadcast, room, namespace, to, in, of, compress, volatile, local