import { StyleSheet } from 'react-native-unistyles';

export const styles = StyleSheet.create((theme) => ({
  zoomModalBackdrop: {
    padding: 0,
    backgroundColor: '#000000',
  },
  zoomModal: {
    flex: 1,
    backgroundColor: '#000000',
  },
  zoomModalCard: {
    flex: 1,
    width: '100%',
    height: '100%',
    maxHeight: '100%',
    padding: 0,
    borderRadius: 0,
    backgroundColor: '#000000',
  },
  zoomModalHeader: {
    backgroundColor: '#000000',
    paddingHorizontal: theme.metrics.spacing.p20,
    paddingBottom: theme.metrics.spacingV.p12,
  },
  zoomModalContent: {
    flex: 1,
    padding: 0,
  },
  zoomTrigger: {
    overflow: 'hidden',
  },
  zoomTriggerImage: {
    width: '100%',
    height: '100%',
  },
  zoomViewer: {
    flex: 1,
  },
}));
