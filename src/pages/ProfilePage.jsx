import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import PageReveal from "../components/motion/PageReveal";
import { useAuth } from "../contexts/AuthContext";
import { DEFAULT_PROFILE_BACKGROUND } from "../data/defaultProfileBackground";
import { currentUserProfile } from "../data/mockUsers";
import { userNavigationItems } from "../components/user/userNavigation";

const DEFAULT_BACKGROUND = DEFAULT_PROFILE_BACKGROUND;
const CROP_RATIO = 16 / 10;

function mergeUser(currentUser) {
  return {
    ...currentUserProfile,
    ...currentUser,
    avatar: currentUser?.avatar || currentUserProfile.avatar,
    nickname: currentUser?.nickname || currentUserProfile.nickname,
    bio: currentUser?.bio || currentUserProfile.bio,
    school: currentUser?.school || currentUserProfile.school,
    major: currentUser?.major || currentUserProfile.major,
    grade: currentUser?.grade || currentUserProfile.grade,
  };
}

function getBackgroundStorageKey(userId) {
  return `profile-background-v2:${userId ?? "default"}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function buildCoverCrop(imageWidth, imageHeight, frameWidth, frameHeight) {
  const imageRatio = imageWidth / imageHeight;
  const frameRatio = frameWidth / frameHeight;

  if (imageRatio > frameRatio) {
    const cropHeight = imageHeight;
    const cropWidth = cropHeight * frameRatio;
    return { sx: (imageWidth - cropWidth) / 2, sy: 0, sw: cropWidth, sh: cropHeight };
  }

  const cropWidth = imageWidth;
  const cropHeight = cropWidth / frameRatio;
  return { sx: 0, sy: (imageHeight - cropHeight) / 2, sw: cropWidth, sh: cropHeight };
}

function buildInteractiveCrop(imageWidth, imageHeight, frameWidth, frameHeight, zoom, offsetX, offsetY) {
  const base = buildCoverCrop(imageWidth, imageHeight, frameWidth, frameHeight);
  const safeZoom = Math.max(1, zoom);
  const sw = base.sw / safeZoom;
  const sh = base.sh / safeZoom;
  const maxX = Math.max(0, imageWidth - sw);
  const maxY = Math.max(0, imageHeight - sh);
  const centerX = (imageWidth - sw) / 2;
  const centerY = (imageHeight - sh) / 2;

  return {
    sx: clamp(centerX + offsetX * maxX * 0.5, 0, maxX),
    sy: clamp(centerY + offsetY * maxY * 0.5, 0, maxY),
    sw,
    sh,
  };
}

export default function ProfilePage() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const fileInputRef = useRef(null);
  const profile = mergeUser(currentUser);
  const storageKey = getBackgroundStorageKey(profile.id);

  const [hoveredPath, setHoveredPath] = useState(null);
  const [backgroundUrl, setBackgroundUrl] = useState(DEFAULT_BACKGROUND);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [sourceImage, setSourceImage] = useState(DEFAULT_BACKGROUND);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [imageNaturalSize, setImageNaturalSize] = useState({ width: 1600, height: 1000 });

  const navItems = useMemo(
    () => [{ to: "/user/profile", label: "个人主页" }, ...userNavigationItems.filter((item) => item.to !== "/user/profile")],
    []
  );

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) {
      setBackgroundUrl(saved);
      setSourceImage(saved);
    } else {
      setBackgroundUrl(DEFAULT_BACKGROUND);
      setSourceImage(DEFAULT_BACKGROUND);
    }
  }, [storageKey]);

  useEffect(() => {
    const image = new Image();
    image.onload = () => setImageNaturalSize({ width: image.naturalWidth, height: image.naturalHeight });
    image.src = sourceImage;
  }, [sourceImage]);

  function resetCropState(nextSource) {
    setSourceImage(nextSource);
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
  }

  function openPicker() {
    resetCropState(backgroundUrl);
    setPickerOpen(true);
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : DEFAULT_BACKGROUND;
      resetCropState(result);
    };
    reader.readAsDataURL(file);
  }

  function saveCrop() {
    const frameWidth = 1600;
    const frameHeight = Math.round(frameWidth / CROP_RATIO);
    const crop = buildInteractiveCrop(
      imageNaturalSize.width,
      imageNaturalSize.height,
      frameWidth,
      frameHeight,
      zoom,
      offsetX,
      offsetY
    );

    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = frameWidth;
      canvas.height = frameHeight;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.drawImage(image, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, frameWidth, frameHeight);
      const dataUrl = canvas.toDataURL("image/png");
      window.localStorage.setItem(storageKey, dataUrl);
      setBackgroundUrl(dataUrl);
      setPickerOpen(false);
    };
    image.src = sourceImage;
  }

  function restoreDefaultBackground() {
    window.localStorage.removeItem(storageKey);
    setBackgroundUrl(DEFAULT_BACKGROUND);
    resetCropState(DEFAULT_BACKGROUND);
    setPickerOpen(false);
  }

  const previewScale = 0.86 * zoom;
  const previewTranslateX = `${offsetX * 14}%`;
  const previewTranslateY = `${offsetY * 14}%`;

  return (
    <PageReveal className="h-full">
      <section className="relative h-[calc(100dvh-76px)] min-h-[calc(100dvh-76px)] overflow-hidden text-white">
        <img
          src={backgroundUrl}
          alt={`${profile.nickname}的个人主页背景`}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(15,23,42,0.05)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.20),transparent_42%)]" />

        <div className="relative flex h-full flex-col px-6 py-8 sm:px-8 lg:px-10">
          <div className="flex-1">
            <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-[190px_minmax(0,1fr)]">
              <nav className="self-start pt-2">
                <ul className="space-y-3">
                  {navItems.map((item) => {
                    const isActive = location.pathname === item.to;
                    const isHovered = hoveredPath === item.to;

                    return (
                      <li key={item.to} className="relative">
                        {isActive || isHovered ? (
                          <motion.div
                            layoutId="profile-jelly-pill"
                            transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.9 }}
                            className="absolute inset-0 rounded-full bg-white/16 backdrop-blur-xl"
                          />
                        ) : null}
                        <NavLink
                          to={item.to}
                          onMouseEnter={() => setHoveredPath(item.to)}
                          onMouseLeave={() => setHoveredPath(null)}
                          onFocus={() => setHoveredPath(item.to)}
                          onBlur={() => setHoveredPath(null)}
                          className={`relative flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition ${
                            isActive ? "text-white" : "text-white/72 hover:text-white"
                          }`}
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="relative">
                <div className="absolute left-[44%] top-1/2 w-full max-w-[420px] -translate-x-1/2 -translate-y-1/2 text-center xl:left-[42%]">
                  <img
                    src={profile.avatar}
                    alt={profile.nickname}
                    className="mx-auto h-28 w-28 rounded-full object-cover shadow-[0_20px_50px_rgba(15,23,42,0.18)]"
                  />
                  <div className="mx-auto mt-8 h-px w-40 bg-white/42" />
                  <div className="mt-8 space-y-3">
                    <h1 className="text-[32px] font-semibold tracking-[-0.06em] text-white">{profile.nickname}</h1>
                    <p className="text-sm tracking-[0.18em] text-white/66">{profile.school}</p>
                    <p className="text-sm text-white/74">{profile.major} · {profile.grade}</p>
                    <p className="mx-auto max-w-[320px] text-sm leading-7 text-white/76">{profile.bio}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={openPicker}
              className="rounded-full bg-white/12 px-4 py-2 text-xs font-medium tracking-[0.12em] text-white backdrop-blur-xl transition duration-200 hover:bg-white/18"
            >
              设置背景
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>
        </div>
      </section>

      {pickerOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.58)] px-4 py-8 backdrop-blur-md">
          <div className="w-full max-w-5xl rounded-[28px] border border-white/60 bg-[rgba(250,250,249,0.94)] p-6 shadow-[0_30px_80px_rgba(15,23,42,0.18)]">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">背景裁切</p>
                <h2 className="mt-2 text-[28px] font-semibold tracking-[-0.06em] text-slate-950">调整个人主页背景</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                  当前默认背景就是你指定的这张图。裁切区域会按主页比例保存，你也可以重新上传其它图片。
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                >
                  上传图片
                </button>
                <button
                  type="button"
                  onClick={() => setPickerOpen(false)}
                  className="rounded-full border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  关闭
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
              <div className="rounded-[26px] bg-[#e7ebef] p-4">
                <div className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-[22px] bg-slate-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)]">
                  <img
                    src={sourceImage}
                    alt="背景裁切预览"
                    className="absolute left-1/2 top-1/2 h-full w-full max-w-none object-cover"
                    style={{
                      transform: `translate(calc(-50% + ${previewTranslateX}), calc(-50% + ${previewTranslateY})) scale(${previewScale})`,
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 border-[1.5px] border-white/80 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.06)]" />
                </div>
              </div>

              <div className="space-y-5 rounded-[24px] bg-white/74 p-5">
                <div>
                  <label className="text-sm font-medium text-slate-700">缩放</label>
                  <input
                    type="range"
                    min="1"
                    max="2.2"
                    step="0.01"
                    value={zoom}
                    onChange={(event) => setZoom(Number(event.target.value))}
                    className="mt-3 w-full accent-slate-900"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">水平位置</label>
                  <input
                    type="range"
                    min="-1"
                    max="1"
                    step="0.01"
                    value={offsetX}
                    onChange={(event) => setOffsetX(Number(event.target.value))}
                    className="mt-3 w-full accent-slate-900"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">垂直位置</label>
                  <input
                    type="range"
                    min="-1"
                    max="1"
                    step="0.01"
                    value={offsetY}
                    onChange={(event) => setOffsetY(Number(event.target.value))}
                    className="mt-3 w-full accent-slate-900"
                  />
                </div>

                <div className="rounded-[20px] border border-slate-200 bg-slate-50/80 px-4 py-4 text-sm leading-7 text-slate-500">
                  当前会按最大可用区域裁切，保存后只影响本地这个用户的个人主页背景。
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={saveCrop}
                    className="rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                  >
                    保存背景
                  </button>
                  <button
                    type="button"
                    onClick={restoreDefaultBackground}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                  >
                    恢复默认
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </PageReveal>
  );
}
