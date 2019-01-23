import parseOptions from './parseOptions';

it('should parse empty options', () => {
    const options = parseOptions([]);
    expect(options.fetch).toBe(false);
    expect(options.configFile).toBe(undefined);
});

it('should parse fetch option', () => {
    const options = parseOptions(['-f']);
    expect(options.fetch).toBe(true);
    expect(options.configFile).toBe(undefined);
});

it('should parse config option', () => {
    const options = parseOptions(['-c', 'file.json']);
    expect(options.fetch).toBe(false);
    expect(options.configFile).toBe('file.json');
});

it('should parse invalid config option', () => {
    const options = parseOptions(['-c']);
    expect(options.fetch).toBe(false);
    expect(options.configFile).toBe(undefined);
});
