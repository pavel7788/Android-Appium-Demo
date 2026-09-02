const { execSync, spawnSync } = require('child_process');
const path = require('path');

// VS Code may start before env vars are applied — fall back to reading from registry
if (!process.env.ANDROID_HOME) {
    const out = execSync('reg query HKCU\\Environment /v ANDROID_HOME', { encoding: 'utf8' });
    const match = out.match(/ANDROID_HOME\s+REG_SZ\s+(.+)/);
    if (match) process.env.ANDROID_HOME = match[1].trim();
}
process.env.ANDROID_SDK_ROOT ??= process.env.ANDROID_HOME;

const [cmd, ...args] = process.argv.slice(2);
const sdk = process.env.ANDROID_HOME;
const [configPath = 'config/wdio.medium-phone.conf.ts', ...testArgs] = args;
const projectRoot = path.resolve(__dirname, '..', '..');

if (cmd === 'test') {
    const gradle = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';
    const build = spawnSync(gradle, [':app:assembleDebug'], {
        cwd: projectRoot,
        stdio: 'inherit',
        shell: process.platform === 'win32',
    });

    if (build.status !== 0) process.exit(build.status ?? 1);
}

// Add a new entry here to support additional commands
const commands = {
    emulator: { bin: `${sdk}\\emulator\\emulator.exe`, shell: false },
    test:     { bin: 'wdio', args: ['run', configPath, ...testArgs], shell: true },
};

const { bin, args: cmdArgs = args, shell } = commands[cmd];
const result = spawnSync(bin, cmdArgs, { stdio: 'inherit', shell });
process.exit(result.status ?? 1);
