export function shouldInstallLocaleControl(search = '') {
  return new URLSearchParams(search).get('embedded') !== 'studio';
}
