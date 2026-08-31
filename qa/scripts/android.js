const { execSync, spawnSync } = require('child_process');

// VS Code may start before env vars are applied — fall back to reading from registry
if (!process.env.ANDROID_HOME) {
    const out = execSync('reg query HKCU\\Environment /v ANDROID_HOME', { encoding: 'utf8' });
    const match = out.match(/ANDROID_HOME\s+REG_SZ\s+(.+)/);
    if (match) process.env.ANDROID_HOME = match[1].trim();
}
process.env.ANDROID_SDK_ROOT ??= process.env.ANDROID_HOME;

const [cmd, ...args] = process.argv.slice(2);
const sdk = process.env.ANDROID_HOME;

// Add a new entry here to support additional commands
const commands = {
    emulator: { bin: `${sdk}\\emulator\\emulator.exe`, shell: false },
    test:     { bin: 'wdio', args: ['run', 'wdio.conf.ts', ...args], shell: true },
};

const { bin, args: cmdArgs = args, shell } = commands[cmd];
const result = spawnSync(bin, cmdArgs, { stdio: 'inherit', shell });
process.exit(result.status ?? 1);
