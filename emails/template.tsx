import {
  Tailwind,
  pixelBasedPreset,
  Html,
  Head,
  Font,
  Container,
} from '@react-email/components';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
      }}
    >
      <Html lang="en" className=" bg-gray-800 text-white">
        <Head>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Container>{children}</Container>
      </Html>
    </Tailwind>
  );
}
