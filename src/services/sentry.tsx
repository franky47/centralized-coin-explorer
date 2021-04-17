import * as Sentry from '@sentry/node'
import { RewriteFrames, Debug, CaptureConsole } from '@sentry/integrations'
import type { Integration } from '@sentry/types'

export function setupSentry() {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) {
    return
  }
  const integrations: Integration[] =
    process.env.NODE_ENV === 'development'
      ? [new Debug()]
      : [new CaptureConsole()]

  if (
    process.env.NEXT_IS_SERVER === 'true' &&
    process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR
  ) {
    // For Node.js, rewrite Error.stack to use relative paths, so that source
    // maps starting with ~/_next map to files in Error.stack with path
    // app:///_next
    integrations.push(
      new RewriteFrames({
        iteratee: frame => {
          frame.filename = frame.filename
            ?.replace(
              process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR!,
              'app:///'
            )
            .replace('.next', '_next')
          return frame
        }
      })
    )
  }

  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    integrations,
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NEXT_PBULIC_VERCEL_ENV ?? 'production',
    release:
      process.env.NEXT_PUBLIC_SENTRY_RELEASE ??
      process.env.VERCEL_GIT_COMMIT_SHA
  })
}
