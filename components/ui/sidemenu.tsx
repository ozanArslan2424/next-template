"use client";
import { useMediaQuery } from "@/lib/hooks/use-media";
import { cn } from "@/lib/utils";
import { ChevronsLeftIcon, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import Button from "./button";

type SideMenuProps = {
    children: React.ReactNode;
    openIcon?: React.ReactNode;
    collapseIcon?: React.ReactNode;
    minWidth?: number;
    maxWidth?: number;
    collapsedButtonBar?: React.ReactNode;
    title?: string;
    className?: string;
};

export const SideMenu = ({
    children,
    openIcon = <MenuIcon size={16} />,
    collapseIcon = <ChevronsLeftIcon size={18} />,
    minWidth = 180,
    maxWidth = 480,
    collapsedButtonBar,
    title,
    className,
}: SideMenuProps) => {
    const pathname = usePathname();
    const isMobile = useMediaQuery("(max-width: 768px)");

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const menuButtonRef = useRef<ElementRef<"div">>(null);

    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, isMobile]);

    const handleMouseDown = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        e.preventDefault();
        e.stopPropagation();

        isResizingRef.current = true;

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseUp = (e: MouseEvent) => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return;
        if (isMobile) return;

        let newWidth = e.clientX;

        if (newWidth < minWidth) newWidth = minWidth;
        if (newWidth > maxWidth) newWidth = maxWidth;

        if (sidebarRef.current && menuButtonRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            menuButtonRef.current.style.setProperty("left", `${newWidth}px`);
            menuButtonRef.current.style.setProperty(
                "width",
                `calc(100% - ${newWidth}px)`,
            );
        }
    };

    const resetWidth = () => {
        if (sidebarRef.current && menuButtonRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "18rem";
            menuButtonRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100% - 18rem)",
            );
            menuButtonRef.current.style.setProperty(
                "left",
                isMobile ? "0" : "18rem",
            );

            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const collapse = () => {
        if (sidebarRef.current && menuButtonRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "0" : "52px";
            menuButtonRef.current.style.setProperty("width", "max-content");
            menuButtonRef.current.style.setProperty("left", "0");

            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const open = () => {
        if (sidebarRef.current && menuButtonRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100vw" : "18rem";
            menuButtonRef.current.style.setProperty(
                "width",
                isMobile ? "52px" : "calc(100% - 18rem)",
            );
            menuButtonRef.current.style.setProperty(
                "left",
                isMobile ? "52px" : "18rem",
            );

            setTimeout(() => setIsResetting(false), 300);
        }
    };

    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group/sidebar relative z-[9999] flex h-full min-h-screen w-72 shrink-0 flex-col overflow-y-auto bg-secondary text-secondary-foreground",
                    isResetting && "transition-all duration-300 ease-in-out",
                    isMobile && "absolute w-0",
                    isCollapsed && "border-r",
                    className,
                )}
            >
                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className={
                        isMobile || isCollapsed
                            ? ""
                            : "absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
                    }
                ></div>
                <Button
                    size="icon_xs"
                    variant="outline"
                    className={cn(
                        "absolute right-3 top-3 opacity-0 transition group-hover/sidebar:opacity-100",
                        isMobile && "opacity-100",
                        isCollapsed && "hidden",
                    )}
                    onClick={collapse}
                >
                    {collapseIcon}
                </Button>

                {title && !isCollapsed && (
                    <div className="min-h-[60px] border-b p-3">
                        <h1 className="truncate pr-2 text-xl font-semibold capitalize">
                            {title}
                        </h1>
                    </div>
                )}

                {isCollapsed ? (
                    <div className="flex flex-col gap-2 p-3 pt-12">
                        {collapsedButtonBar}
                    </div>
                ) : (
                    <div className="p-3">{children}</div>
                )}
            </aside>

            <div
                ref={menuButtonRef}
                className={cn(
                    "absolute left-60 top-0 z-[99999] w-[calc(100%-60px)]",
                    isResetting && "transition-all duration-300 ease-in-out",
                    isMobile && "left-0 w-min",
                )}
            >
                <nav className="bg-transparent p-3">
                    {isCollapsed && (
                        <Button size="icon_xs" variant="primary" onClick={open}>
                            {openIcon}
                        </Button>
                    )}
                </nav>
            </div>
        </>
    );
};
