# print banner
from utils.utils import banner

banner()

# check and install dependencies
from utils.dependencies import check_and_install_dependencies

check_and_install_dependencies()

from check_updates import check_updates

import sys
import os

from utils.args_handler import validate_and_parse_args
from utils.utils import read_cookies
from utils.logger_manager import logger

from core.tiktok_recorder import TikTokRecorder
from utils.enums import TikTokError
from utils.custom_exceptions import LiveNotFound, ArgsParseError, \
    UserLiveException, IPBlockedByWAF, TikTokException

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def main(user):
    url=None
    room_id=None 
    mode='manual' 
    automatic_interval=5
    proxy=None 
    output=None
    duration=None
    telegram=False 
    update_check=True
    try:

        # check for updates
        if update_check is True:
            logger.info("Checking for updates...\n")
            if check_updates():
                exit()
        else:
            logger.info("Skipped update check\n")

        # read cookies from file
        cookies = read_cookies()

        TikTokRecorder(
            url=url,
            user=user,
            room_id=room_id,
            mode=mode,
            automatic_interval=automatic_interval,
            cookies=cookies,
            proxy=proxy,
            output=output,
            duration=duration,
            use_telegram=telegram,
        ).run()

    except ArgsParseError as ex:
        logger.error(ex)

    except LiveNotFound as ex:
        logger.error(ex)

    except IPBlockedByWAF:
        logger.error(TikTokError.WAF_BLOCKED)

    except UserLiveException as ex:
        logger.error(ex)

    except TikTokException as ex:
        logger.error(ex)

    except Exception as ex:
        logger.error(ex)


if __name__ == "__main__":
    main('tes')
