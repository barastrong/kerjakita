"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const cookieName = (slug: string) => `kerjakita-follow-${slug}`;

export function FollowButton({ slug }: { slug: string }) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- cookie is only readable on the client; syncing after mount avoids hydration mismatch.
    setFollowing(
      document.cookie
        .split("; ")
        .some((item) => item === `${cookieName(slug)}=1`),
    );
  }, [slug]);

  function toggle() {
    const next = !following;
    setFollowing(next);
    document.cookie = next
      ? `${cookieName(slug)}=1; path=/; max-age=31536000; samesite=lax`
      : `${cookieName(slug)}=; path=/; max-age=0; samesite=lax`;
  }

  return (
    <Button
      type="button"
      variant={following ? "primary" : "outline"}
      aria-pressed={following}
      onClick={toggle}
    >
      {following ? "Diikuti" : "Ikuti perusahaan"}
    </Button>
  );
}
