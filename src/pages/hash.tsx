import { NextPage } from 'next'
import React from 'react'
import { generateHashAvatarDataURL } from 'src/client/components/HashAvatar/dataURL'
import { HashAvatar } from 'src/client/components/HashAvatar/react'
import { AppPageLayout } from 'src/layouts/AppPageLayout'

// --

const IndexPage: NextPage = () => {
  return (
    <AppPageLayout maxW="5xl">
      <img
        src={generateHashAvatarDataURL({
          hash:
            'ef28b2b5ef69eea79f9257f2cbbaafcb7aaaded8a4aa5a6b95e929cbd7bda7dbeaabda7baa5aef7aa8b2aa2a7acb77b2',
          variant: 'stagger'
        })}
      />
      <HashAvatar
        hash="ef28b2b5ef69eea79f9257f2cbbaafcb7aaaded8a4aa5a6b95e929cbd7bda7dbeaabda7baa5aef7aa8b2aa2a7acb77b2"
        variant="stagger"
      />
    </AppPageLayout>
  )
}

export default IndexPage
