// Coalesce a browser double click into its original command. The engine still verifies the
// original idempotency fingerprint and all authority/version/evidence guards on a new intent.
export function commandIntent(previous,identity,build,at,windowMs=1200){
 if(previous?.identity===identity&&at>=previous.at&&at-previous.at<windowMs)return previous;
 return {identity,at,command:build()};
}
