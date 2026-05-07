import posthog from 'posthog-js';

type DownloadSource =
  | 'nav'
  | 'hero'
  | 'download_section'
  | 'email_form_success'
  | 'email_form_error';

export function trackDownloadClicked(
  source: DownloadSource,
  platform: 'macos' = 'macos',
) {
  if (typeof window === 'undefined') return;
  posthog.capture('app_download_clicked', { source, platform });
}

export function trackSendToMacIntentShown(source: 'nav' | 'hero') {
  if (typeof window === 'undefined') return;
  posthog.capture('send_to_mac_intent_shown', { source });
}

export function trackSendToMacOption(
  option: 'airdrop' | 'email' | 'share' | 'other_computer',
) {
  if (typeof window === 'undefined') return;
  posthog.capture('send_to_mac_option_picked', { option });
}

export function trackSendToMacEmailSubmitted(
  outcome: 'success' | 'error',
  form: 'mobile_sheet' | 'desktop_other_computer',
) {
  if (typeof window === 'undefined') return;
  posthog.capture('send_to_mac_email_submitted', { outcome, form });
}
