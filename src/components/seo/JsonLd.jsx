/**
 * Reusable JSON-LD structured data renderer.
 *
 * Renders a `<script type="application/ld+json">` block with safely
 * serialized data. `<` characters are escaped so user-supplied strings
 * (e.g. admin-entered product descriptions) can never close the script
 * tag or inject HTML/JavaScript.
 */
export function JsonLd({ data }) {
  if (!data) return null;
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

export default JsonLd;
