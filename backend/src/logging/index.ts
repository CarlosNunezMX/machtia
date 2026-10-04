interface LoggerInit {
  name: string;
  date: boolean;
}
const LoggerDefaults = {
  name: "",
  date: true,
};

const ANSI_RESET = "\x1b[0m";
const ANSI_BOLD = "\x1b[1m";

export default class Logger {
  constructor(private configuration: LoggerInit = LoggerDefaults) {}
  protected writter(type: string, color: string): string {
    const format = `${Bun.color(color, "ansi")}${ANSI_BOLD}`;
    const date = this.configuration.date
      ? `${ANSI_RESET}${ANSI_BOLD}[${new Date().toUTCString()}]`
      : "";
    return `${format}[${this.configuration.name}][${type}]${date}${ANSI_RESET}: `;
  }

  info(...items: any[]): Logger {
    console.write(this.writter("INFO", "gray"));
    console.log(...items);
    return this;
  }
  error(...items: any[]): Logger {
    console.write(this.writter("ERROR", "red"));
    console.error(...items);
    return this;
  }

  log(...items: any[]): Logger {
    console.write(this.writter("LOG", "white"));
    console.log(...items);
    return this;
  }

  success(...items: any[]): Logger {
    console.write(this.writter("success", "green"));
    console.log(...items);
    return this;
  }

  public static readonly instance: Logger = new Logger({
    name: "default",
    date: true,
  });

  public static as(as: string): Logger {
    return new Logger({ date: true, name: as });
  }
}
