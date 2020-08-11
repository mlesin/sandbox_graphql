declare namespace NodeJS {
  import http from 'http';
  export interface Process {
    httpServer?: http.Server;
  }
}
