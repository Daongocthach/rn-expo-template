import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps, BottomSheetScrollViewMethods } from '@gorhom/bottom-sheet';
import { X } from 'lucide-react-native';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  forwardRef,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, Pressable, View, type ScrollViewProps } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { IconButton } from '@/common/components/IconButton';

export interface OpenSheetOptions {
  snapPoints?: Array<string | number>;
  isScroll?: boolean;
  enablePanDownToClose?: boolean;
  showCloseButton?: boolean;
  containerVariant?: 'view' | 'scroll' | 'none';
  enableDynamicSizing?: boolean;
  maxDynamicContentSize?: number;
  onDismiss?: () => void;
}

interface BottomSheetContextType {
  openSheet: (content: ReactNode, options?: OpenSheetOptions) => void;
  closeSheet: () => void;
}

interface AppBottomSheetProviderProps {
  children: ReactNode;
}

interface FixedBackdropProps extends Pick<BottomSheetBackdropProps, 'animatedIndex' | 'style'> {
  onPress: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

type AnimatedScrollViewComponent = NonNullable<
  React.ComponentProps<typeof KeyboardAwareScrollView>['ScrollViewComponent']
>;

const KeyboardAwareBottomSheetScrollView = forwardRef<
  BottomSheetScrollViewMethods,
  ScrollViewProps
>(({ children, ...props }, ref) => {
  return (
    <BottomSheetScrollView {...props} ref={ref}>
      {children ?? null}
    </BottomSheetScrollView>
  );
}) as unknown as AnimatedScrollViewComponent;

KeyboardAwareBottomSheetScrollView.displayName = 'KeyboardAwareBottomSheetScrollView';

function FixedBackdrop({ animatedIndex, style, onPress }: FixedBackdropProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animatedIndex.value, [-1, 0], [0, 1], 'clamp'),
  }));

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[style, styles.backdropContainer, animatedStyle]}
    >
      <Pressable style={styles.backdrop} onPress={onPress} />
    </Animated.View>
  );
}

export function AppBottomSheetProvider({ children }: AppBottomSheetProviderProps) {
  const { t } = useTranslation();
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const pendingOpenRef = useRef(false);
  const isPresentedRef = useRef(false);
  const dismissHandlerRef = useRef<(() => void) | undefined>(undefined);
  const [content, setContent] = useState<ReactNode>(null);
  const [snapPoints, setSnapPoints] = useState<Array<string | number>>(['1%']);
  const [enablePanDownToClose, setEnablePanDownToClose] = useState(true);
  const [showCloseButton, setShowCloseButton] = useState(false);
  const [containerVariant, setContainerVariant] = useState<'view' | 'scroll' | 'none'>('view');
  const [enableDynamicSizing, setEnableDynamicSizing] = useState(false);
  const [maxDynamicContentSize, setMaxDynamicContentSize] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!pendingOpenRef.current) {
      return;
    }

    pendingOpenRef.current = false;
    requestAnimationFrame(() => {
      bottomSheetRef.current?.present();
    });
  }, [content, snapPoints]);

  const openSheet = useCallback<BottomSheetContextType['openSheet']>((nextContent, options) => {
    const {
      snapPoints: nextSnapPoints = ['70%'],
      isScroll: nextIsScroll = false,
      enablePanDownToClose: nextEnablePanDownToClose = true,
      showCloseButton: nextShowCloseButton,
      containerVariant: nextContainerVariant = nextIsScroll ? 'scroll' : 'view',
      enableDynamicSizing: nextEnableDynamicSizing = false,
      maxDynamicContentSize: nextMaxDynamicContentSize,
      onDismiss,
    } = options ?? {};

    pendingOpenRef.current = !isPresentedRef.current;
    dismissHandlerRef.current = onDismiss;
    setSnapPoints(nextSnapPoints);
    setContent(nextContent);
    setEnablePanDownToClose(nextEnablePanDownToClose);
    setShowCloseButton(nextShowCloseButton ?? !nextEnablePanDownToClose);
    setContainerVariant(nextContainerVariant);
    setEnableDynamicSizing(nextEnableDynamicSizing);
    setMaxDynamicContentSize(nextMaxDynamicContentSize);
  }, []);

  const closeSheet = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetRef.current?.dismiss();
  }, []);

  const contextValue = useMemo(
    () => ({
      openSheet,
      closeSheet,
    }),
    [closeSheet, openSheet]
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <FixedBackdrop animatedIndex={props.animatedIndex} style={props.style} onPress={closeSheet} />
    ),
    [closeSheet]
  );

  const contentBottomPadding = theme.metrics.spacingV.p24;

  const closeButton = showCloseButton ? (
    <View style={styles.closeButtonContainer}>
      <IconButton
        icon={X}
        size="md"
        variant="ghost"
        onPress={closeSheet}
        accessibilityLabel={t('common.close')}
      />
    </View>
  ) : null;

  let renderedContent = content;

  if (containerVariant === 'scroll') {
    renderedContent = (
      <>
        {closeButton}
        <KeyboardAwareScrollView
          ScrollViewComponent={KeyboardAwareBottomSheetScrollView}
          contentContainerStyle={[
            styles.scrollContentContainer,
            { paddingBottom: contentBottomPadding },
          ]}
          bottomOffset={theme.metrics.spacingV.p16}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          {content}
        </KeyboardAwareScrollView>
      </>
    );
  }

  if (containerVariant === 'view') {
    renderedContent = (
      <BottomSheetView style={[styles.contentContainer, { paddingBottom: contentBottomPadding }]}>
        {closeButton}
        {content}
      </BottomSheetView>
    );
  }

  return (
    <BottomSheetModalProvider>
      <BottomSheetContext.Provider value={contextValue}>
        {children}

        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          topInset={insets.top}
          bottomInset={insets.bottom}
          enableDynamicSizing={enableDynamicSizing}
          maxDynamicContentSize={maxDynamicContentSize}
          enablePanDownToClose={enablePanDownToClose}
          enableHandlePanningGesture={enablePanDownToClose}
          enableContentPanningGesture={enablePanDownToClose}
          enableOverDrag={false}
          backdropComponent={renderBackdrop}
          backgroundStyle={[
            styles.sheetBackground,
            { backgroundColor: theme.colors.background.surface },
          ]}
          handleIndicatorStyle={[
            styles.sheetHandle,
            { backgroundColor: theme.colors.border.default },
          ]}
          onDismiss={() => {
            isPresentedRef.current = false;
            setContent(null);
            dismissHandlerRef.current?.();
            dismissHandlerRef.current = undefined;
          }}
          onChange={(index) => {
            isPresentedRef.current = index >= 0;
          }}
        >
          <BottomSheetContext.Provider value={contextValue}>
            {renderedContent}
          </BottomSheetContext.Provider>
        </BottomSheetModal>
      </BottomSheetContext.Provider>
    </BottomSheetModalProvider>
  );
}

export function useAppBottomSheet() {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw new Error('useAppBottomSheet must be used within an AppBottomSheetProvider');
  }

  return context;
}

const styles = StyleSheet.create((theme) => ({
  contentContainer: {
    flex: 1,
    paddingHorizontal: theme.metrics.spacing.p20,
    paddingTop: theme.metrics.spacingV.p20,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingHorizontal: theme.metrics.spacing.p16,
    paddingTop: theme.metrics.spacingV.p16,
  },
  closeButtonContainer: {
    alignItems: 'flex-end' as const,
    marginTop: -theme.metrics.spacingV.p8,
    marginBottom: theme.metrics.spacingV.p4,
  },
  backdrop: {
    flex: 1,
    backgroundColor: theme.colors.overlay.modal,
  },
  backdropContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  sheetBackground: {
    borderTopLeftRadius: theme.metrics.borderRadius.xl,
    borderTopRightRadius: theme.metrics.borderRadius.xl,
  },
  sheetHandle: {
    width: theme.metrics.spacing.p40,
  },
}));
