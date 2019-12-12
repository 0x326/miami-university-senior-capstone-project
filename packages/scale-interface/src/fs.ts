import {
  promises as fs,
  MakeDirectoryOptions,
  RmDirAsyncOptions,
} from 'fs'
import assert from 'assert'
import {
  resolve,
  relative,
} from 'path'

type Path = string

interface FSBoundaryOptions {
  boundary: Path;
}

function isPathWithinBoundary(path: Path, boundary: Path): boolean {
  const [absolutePath, absoluteBoundary] = [resolve(path), resolve(boundary)]
  const pathRelativeToBoundary = relative(absoluteBoundary, absolutePath)
  return pathRelativeToBoundary.startsWith('..') === false
}

function mkdir(
  path: Path,
  options: MakeDirectoryOptions & FSBoundaryOptions,
): Promise<void> {
  assert(isPathWithinBoundary(path, options.boundary))
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  return fs.mkdir(path, options)
}

function readdir(
  path: Path,
  options: {
    encoding?: BufferEncoding | null;
    withFileTypes?: false;
  } & FSBoundaryOptions,
): Promise<string[]> {
  assert(isPathWithinBoundary(path, options.boundary))
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  return fs.readdir(path, options)
}

function rmdir(
  path: Path,
  options: RmDirAsyncOptions & FSBoundaryOptions,
): Promise<void> {
  assert(isPathWithinBoundary(path, options.boundary))
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  return fs.rmdir(path, options)
}

function readFile(
  path: Path,
  options: {
    encoding?: BufferEncoding | null;
    flag?: string | number;
  } & FSBoundaryOptions,
): Promise<string | Buffer> {
  assert(isPathWithinBoundary(path, options.boundary))
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  return fs.readFile(path, options)
}

function writeFile(
  path: Path,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  options: {
    encoding?: string | null;
    mode?: string | number;
    flag?: string | number;
  } & FSBoundaryOptions,
): Promise<void> {
  assert(isPathWithinBoundary(path, options.boundary))
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  return fs.writeFile(path, data, options)
}

function unlink(
  path: Path,
  options: FSBoundaryOptions,
): Promise<void> {
  assert(isPathWithinBoundary(path, options.boundary))
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  return fs.unlink(path)
}

export {
  mkdir,
  readdir,
  rmdir,
  readFile,
  writeFile,
  unlink,
}
