#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

#import <GoogleMaps/GoogleMaps.h>
//Now paste this line (it should be the first call of the method 
//so paste it the first curly braces at the top)

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"RevXMobileApp";

  [GMSServices provideAPIKey:@"AIzaSyC7Y3a-Q8qZXj5XgLzpHa92b_nw3sR8aWE"];
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
