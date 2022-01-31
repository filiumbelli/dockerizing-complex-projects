import keys from "./keys";
import { createClient } from "redis";


const redisClient = createClient({
  url: `redis://localhost:6380`,
});


const sub = redisClient.duplicate();

sub.connect();


function fib(index: number): number {
  if (index < 2) return 1;
  return fib(index - 1) + fib(index - 2);
}

sub.on("message", (channel, message) => {
  redisClient.hSet("values", message, fib(parseInt(message)));
});

sub.subscribe("insert", () => {
  console.log("Inserting");
});